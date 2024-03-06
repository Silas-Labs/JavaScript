var list={
        1:
        [
            {
                id:1,name:"Abby",checked:false
            },
            {
                id:2,name:"Alex",checked:true
            }
        ],
        2:
        [
            {
                id:1,name:"Ben",checked:false
            },
            {
                id:2,name:"Brian",checked:true
            }
        ],
        3:
        [
            {
                id:1,name:"Candy",checked:false
            },
            {
                id:2,name:"Caren",checked:true
            }
        ],
        4:
        [
            {
                id:1,name:"Diana",checked:false
            },
            {
                id:2,name:"Drew",checked:true
            }
        ]
};

console.log(JSON.stringify(list));
const objectToEdit={...list};
const itemToEdit=objectToEdit[4].find(item=>item.id==1)
if(itemToEdit){
    itemToEdit.name="Denise";
    itemToEdit.checked=true;
}
console.log(itemToEdit)
console.log(objectToEdit)
