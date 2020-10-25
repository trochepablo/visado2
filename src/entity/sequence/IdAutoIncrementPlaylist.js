
class IdAutoIncrementPlaylist {

   constructor() {
     this.id = 0;
   }

   idAutoIncrement() {
     return this.id = this.id + 1;
   }

   getId() {
     return this.id;
   }

   setId(id) {
     this.id = id;
   }
}

module.exports = IdAutoIncrementPlaylist;