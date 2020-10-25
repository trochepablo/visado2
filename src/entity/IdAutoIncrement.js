
class IdAutoIncrement {

   constructor() {
     this.id = 0;
   }

   idAutoIncrement() {
     this.id = this.id + 1;
   }

   getId() {
     return this.id;
   }

   setId(id) {
     this.id = id;
   }
}

module.exports = IdAutoIncrement;