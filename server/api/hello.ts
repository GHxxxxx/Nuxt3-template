export default defineEventHandler((event)=>{
    return{
        message:"hello world",
        data: {
            name: "John",
            age: 30,
            city: "New York"
          }
    }
})