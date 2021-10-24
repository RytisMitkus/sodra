<template>
  <div>
    <input type="file" ref="file" v-on:change="handleUpload()" />
    <button v-on:click="uploadFile()">Upload</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NewsDashboard",
  data() {
    return {
      file: "",
    };
  },
  methods: {
    handleUpload() {
      this.file = this.$refs.file.files[0];
    },
    async uploadFile() {
      const formData = new FormData();

      formData.append("file", this.file);

      const data = await axios.post(
        "http://localhost:3000/api/news/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            withCredentials: true,
          },
        }
      );
      console.log(data);
    },
  },
};
</script>

<style></style>
