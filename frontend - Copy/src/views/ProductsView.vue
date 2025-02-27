<template>
    <div class="q-pa-md">
      <div class="q-pa-md">
        <q-btn icon="add" @click="onCreate" />
      </div>
      <q-table
        title="Products"
        :rows="rows"
        :columns="columns"
        row-key="product_id"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              dense
              round
              icon="edit"
              @click="onEdit(props.row.product_id)"
            />
            <q-btn
              flat
              dense
              round
              icon="delete"
              @click="onDelete(props.row.product_id)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import router from "../router";
  
  // ปรับคอลัมน์ให้ตรงกับข้อมูลใน Products
  const columns = [
    { name: 'product_id', align: 'center', label: 'รหัสสินค้า', field: 'product_id', sortable: true },
    { name: 'name', align: 'center', label: 'Product Name', field: 'name', sortable: true },
    { name: 'description', align: 'center', label: 'Description', field: 'description', sortable: true },
    { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true },
    { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
  ];
  
  const rows = ref([]);
  
  // ดึงข้อมูล Products
  const fetchData = async () => {
    fetch('http://localhost:8800/api/v1/products')
      .then(res => res.json())
      .then(result => {
        rows.value = result;
      });
  };
  fetchData();
  
  // การสร้างสินค้าใหม่
  const onCreate = () => {
    router.push('/createProducts');
  };
  
  // การแก้ไขสินค้า
  const onEdit = (id) => {
    router.push('/updateProducts/' + id);
  };
  
  // การลบสินค้า
  const onDelete = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
  
    fetch(`http://localhost:8800/api/v1/products/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
        console.log(result);
        if (result.status === "OK") {
          router.push('/products');
        }
        fetchData();
      })
      .catch((error) => console.log('error', error));
  };
  </script>