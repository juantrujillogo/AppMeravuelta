const mongoose = require('mongoose');

const uri = "mongodb+srv://juantrujillogo_db_user:GJfaYqxvA0nEY5Yw@cluster0.7fon4z6.mongodb.net/SmarcartIA?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  console.log("Intentando conectar con mongodb+srv...");
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("¡Conexión SRV exitosa!");
    process.exit(0);
  } catch (error) {
    console.error("Error de conexión SRV:");
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();
