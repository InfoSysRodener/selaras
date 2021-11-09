<template>
    <div>
        <div v-for="art in arts" :key="art">
            <img class="py-2" :src="require(`~/assets/artCategory/${art.replace('./', '')}`)" />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                arts:[]
            }
        },
        mounted(){
            // console.log(arts);
             this.fetchArts(require.context('../../assets/artCategory/', true));
        },
        methods:{
            fetchArts(art){
                art.keys().forEach(element => {
                      console.log(element);  
                      this.arts.push(element);
                });
                
            }
        }
        
    }
</script>