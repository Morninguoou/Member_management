<template>
  <form @submit.prevent="submitForm">
    <label for="title">คำนำหน้า:</label>
    <select v-model="member.title">
      <option value="นาย">นาย</option>
      <option value="นาง">นาง</option>
      <option value="นางสาว">นางสาว</option>
    </select>

    <label for="first_name">ชื่อ:</label>
    <input v-model="member.first_name" />

    <label for="last_name">นามสกุล:</label>
    <input v-model="member.last_name" />

    <label for="birth_date">วันเกิด:</label>
    <input type="date" v-model="member.birth_date" />

    <button type="submit">บันทึก</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      member: {
        title: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        profile_image: ''
      }
    };
  },
  methods: {
    submitForm() {
      // เรียกใช้ API เพื่อบันทึกสมาชิก
      this.$http.post('http://localhost:3000/members', this.member)
        .then(response => {
          alert('บันทึกข้อมูลสำเร็จ');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
