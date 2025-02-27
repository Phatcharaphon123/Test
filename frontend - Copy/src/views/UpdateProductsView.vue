<template>
    <div class="q-gutter-md" style="max-width: 400px;">
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="product_id" label="Product ID" readonly />
            <q-input v-model="name" label="Product Name" />
            <q-input v-model="description" label="Description" />
            <q-input v-model="price" label="Price" type="number" />
            <q-btn type="submit" label="Update" color="primary" />
        </q-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// รับค่า ID จาก URL params
const product_id = ref(route.params.id);
const name = ref('');
const description = ref('');
const price = ref('');

// ฟังก์ชันดึงข้อมูลสินค้า
const fetchData = () => {
    fetch("http://localhost:8800/api/v1/products/" + product_id.value)
    .then(res => res.json())
    .then(result => {
        name.value = result.name;
        description.value = result.description;
        price.value = result.price;
    });
}
fetchData();

// ฟังก์ชันเมื่อกดปุ่ม Submit
const onSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // เตรียมข้อมูลที่จะส่งไปอัปเดต
    const raw = JSON.stringify({
        "name": name.value,
        "description": description.value,
        "price": price.value
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // ส่งคำขอ PUT ไปอัปเดตข้อมูลสินค้า
    fetch(`http://localhost:8800/api/v1/products/${product_id.value}`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message || 'Something went wrong!');
                });
            }
            return response.json();
        })
        .then((result) => {
            alert(result.message);
            console.log(result);
            if (result.status === 'OK') {
                router.push('/products');  // เมื่อสำเร็จจะกลับไปที่หน้า Products
            }
            fetchData();  // อัปเดตข้อมูลหลังจากการแก้ไข
        })
        .catch((error) => {
            console.error('error', error);
            alert('Error:', error.message);
        });
}
</script>