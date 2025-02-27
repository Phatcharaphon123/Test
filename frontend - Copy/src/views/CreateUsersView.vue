<template>
    <div class="q-gutter-md" style="max-width: 400px;">
        <q-form 
        @submit="onSubmit" 
        class="q-gutter-md">
            <q-input v-model="username" label="Username" />
            <q-input v-model="password" label="Password" type="password" />
            <q-input v-model="email" label="Email" />
            <q-btn type="submit" label="Submit" color="primary" />
        </q-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router';

const username = ref('');
const password = ref('');
const email = ref('');

// เมื่อฟอร์มถูกส่ง
const onSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": username.value,
        "password": password.value,
        "email": email.value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // เปลี่ยน URL จาก /customers เป็น /users
    fetch("http://localhost:8800/api/v1/users", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            alert(result.message);
            if (result.status === 'ok') {
                router.push('/users'); // ถ้าสำเร็จจะพาไปหน้า Home
            }
        })
        .catch((error) => console.error(error));
}
</script>