<template>
    <div class="q-gutter-md" style="max-width: 400px;">
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="id" label="ID" readonly />
            <q-input v-model="username" label="Username" />
            <q-input v-model="password" label="Password" />
            <q-input v-model="email" label="Email"  />
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
const id = ref(route.params.id);
const username = ref('');
const password = ref('');
const email = ref('');

// ฟังก์ชันดึงข้อมูลผู้ใช้งานจาก API
const fetchData = () => {
    fetch("http://localhost:8800/api/v1/users/" + id.value)
    .then(res => res.json())
    .then(result => {
        username.value = result.username;
        password.value = result.password;  // ห้ามแสดงรหัสผ่านโดยตรง
        email.value = result.email;
    });
}
fetchData();

// ฟังก์ชันเมื่อกดปุ่ม Submit
const onSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // เตรียมข้อมูลที่จะส่งไปอัปเดต
    const raw = JSON.stringify({
        "username": username.value,
        "password": password.value,  // ถ้าไม่อยากเปลี่ยน password ก็ไม่ต้องส่ง
        "email": email.value
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // ส่งคำขอ PUT ไปอัปเดตข้อมูล
    fetch(`http://localhost:8800/api/v1/users/${id.value}`, requestOptions)
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
                router.push('/users');  // เมื่อสำเร็จจะกลับไปที่หน้า Home
            }
            fetchData();  // อัปเดตข้อมูลหลังจากการแก้ไข
        })
        .catch((error) => {
            console.error('error', error);
            alert('Error:', error.message);
        });
}
</script>