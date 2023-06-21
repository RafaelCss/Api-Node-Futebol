interface Usuario {
   name : {
      first : string
      last : string
   }
   email : string
   login :{
      uuid : string
      username : string
   }
   dob : {
      age : number | string
   }
   picture : {
      medium : string
   }
}






export default Usuario