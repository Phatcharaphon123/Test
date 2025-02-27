<template>
    <div class="q-pa-md">
      <div class="q-pa-md">
        <q-btn icon="add" @click="onCreate" />
      </div>
      <q-table
        title="Users"
        :rows="rows"
        :columns="columns"
        row-key="user_id"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              dense
              round
              icon="edit"
              @click="onEdit(props.row.user_id)"
            />
            <q-btn
              flat
              dense
              round
              icon="delete"
              @click="onDelete(props.row.user_id)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
   
  </template>

  <script setup>
  import { ref } from "vue";
  import router from "../router";
  
  // ปรับคอลัมน์ให้ตรงกับข้อมูลใน Users
  const columns = [
    { name: 'user_id', align: 'center', label: 'รหัสผู้ใช้งาน', field: 'user_id', sortable: true },
    { name: 'username', align: 'center', label: 'Username', field: 'username', sortable: true },
    { name: 'password', align: 'center', label: 'Password', field: 'password', sortable: true},
    { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
    { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
  ];
  
  const rows = ref([]);
  
  // ดึงข้อมูล Users
  const fetchData = async () => {
    fetch('http://localhost:8800/api/v1/users')
      .then(res => res.json())
      .then(result => {
        rows.value = result;
      });
  };
  fetchData();
  
  // การสร้างผู้ใช้งานใหม่
  const onCreate = () => {
    router.push('/createUsers');
  };
  
  // การแก้ไขผู้ใช้งาน
  const onEdit = (id) => {
    router.push('/updateUsers/' + id);
  };
  
  // การลบผู้ใช้งาน
  const onDelete = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
  
    fetch(`http://localhost:8800/api/v1/users/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
        console.log(result);
        if (result.status === "ok") {
          router.push('/');
        }
        fetchData();
      })
      .catch((error) => console.log('error', error));
  };
  </script>