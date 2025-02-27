<template>
    <div class="q-gutter-md" style="max-width: 400px;">
        <q-form 
        @submit="onSubmit" 
        class="q-gutter-md">
            <q-input v-model="name" label="Product Name" />
            <q-input v-model="description" label="Description" />
            <q-input v-model="price" label="Price" type="number" />
            <q-btn type="submit" label="Submit" color="primary" />
        </q-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router';

const name = ref('');
const description = ref('');
const price = ref('');

// เมื่อฟอร์มถูกส่ง
const onSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name.value,
        "description": description.value,
        "price": price.value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // เปลี่ยน URL จาก /users เป็น /products
    fetch("http://localhost:8800/api/v1/products", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            alert(result.message);
            if (result.status === 'ok') {
                router.push('/products'); // ถ้าสำเร็จจะพาไปหน้า Products
            }
        })
        .catch((error) => console.error(error));
}
</script>