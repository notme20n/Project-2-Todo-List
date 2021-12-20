const express=require('express')
const app=express()
const db=require ('./db')
const Todo=require ('./todo')
//console.log(Todo);
app.use(express.json())

app.get("/",(req,res)=>{
    res.json("get is working")
})

app.get("/tasks",(req,res)=>{
    Todo.find({},(err,data)=>{
        if(err){
            console.log("ERRO: ",err);
        }else{
            res.json(data)
        }
    });
});
app.post("/tasks",(req,res)=>{
    console.log("25:", req.body)
    Todo.create(req.body,(err,newTask)=>{
        if(err){
            console.log("ERRO: ",err);
        }else{
            res.status(201).json("Created New Todo Successfully");
        }
    });
});

  app.delete("/tasks/:id",(req,res)=>{
      console.log("37:", req.params.id);
      Todo.deleteOne({_id:req.params.id},(err,deleteObj)=>{
          
        if (err) {
            console.log("ERROR: ",err);
        }else{
            deleteObj.deletedCount===1
            ?res.json("Deleted New one Todo Successfully")
            : res.status(404).json ("this todo is not found")
        }
  })
      // deleted at most one tank document

  });

  app.put("/tasks/:id",(req,res)=>{
    //console.log("37:", req.params.id);
    Todo.updateOne(
        {_id:req.params.id},
        {title:req.body.newTitle},
        (err,updateObj)=>{
           if (err) {
        console.log("ERROR: ",err);
        res.status(400).json(err)
         }else{
          console.log(updateObj);
          updateObj.modifiedCount===1
          ? res.json("update New one Todo Successfully")
          : res.status(404).json ("this todo is not found");
      }
})
    // update at most one tank document

});
app.listen(5000,()=>{
    console.log("server is working....")
});