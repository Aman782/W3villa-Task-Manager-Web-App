import mongoose from 'mongoose';

const db_connection = async()=>{
    await mongoose.connect("mongodb+srv://amanpandey45692:D4iVpcugCOHCBryg@cluster0.szhka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then((res)=>{
       console.log("DB Connected Successfully!");
    }).catch((err)=>{
        console.log("DB Error");
    });
}

export default db_connection;