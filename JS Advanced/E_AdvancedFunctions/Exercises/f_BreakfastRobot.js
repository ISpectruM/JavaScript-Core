let cook = (function () {
    let ingredients = {
        "protein":0,
        "carbohydrate":0,
        "fat":0,
        "flavour":0
    };

    return function (input) {
        let tokens = input.split(' ');
        let command = tokens[0];
        let quantity =0;
        switch (command){
            case "restock":
                let element = tokens[1];
                quantity = Number(tokens[2]);
                ingredients[element] += quantity;
                return "Success";
                break;
            case "prepare":
                let recipe = tokens[1];
                quantity = Number(tokens[2]);
                return cook(recipe,quantity);
                break;
            case "report":
                return `protein=${ingredients.protein} carbohydrate=${ingredients.carbohydrate} fat=${ingredients.fat} flavour=${ingredients.flavour}`;
                break;
        }
    };

    function cook(recipe,amount){
        switch (recipe){
            case "apple":
                return produce(amount,{
                    carbohydrate:1,
                    flavour:2});
                break;
            case "coke":
                return produce(amount,{
                    carbohydrate:10,
                    flavour:20
                });
                break;
            case "burger":
                return produce(amount,{
                    carbohydrate:5,
                    fat:7,
                    flavour:3
                });
                break;
            case "omelet":
                return produce(amount,{
                    protein:5,
                    fat:1,
                    flavour:1
                });
                break;
            case "cheverme":
                let result = produce(amount,{
                    protein:10,
                    carbohydrate:10,
                    fat:10,
                    flavour:10
                });
                return result;
                break
        }

        function produce(amount, product) {
            let success = checkIngredients();
            if (success[0]) {
                cook(product);
                return "Success"
            }else {
                return `Error: not enough ${success[1]} in stock`
            }

            function cook() {
                for (let ingr in product) {
                    if (product.hasOwnProperty(ingr))
                        ingredients[ingr]-= product[ingr]*amount;
                }
            }

            function checkIngredients() {

                for (let ingredient in product) {
                    if (product.hasOwnProperty(ingredient)){
                        if (ingredients[ingredient]-(product[ingredient]*amount) < 0){
                            return [false,ingredient];
                        }
                    }
                }
                return [true,true];
            }
        }
    }
})();
console.log(cook('restock flavour 50'));
console.log(cook('prepare cheverme 4'));

cook("prepare cheverme 1");
cook("restock protein 10");
cook("prepare cheverme 1");
cook("restock carbohydrate 10");
cook("prepare cheverme 1");
cook("restock fat 10");
cook("prepare cheverme 1");
cook("restock flavour 10");
cook("prepare cheverme 1");
cook("report");
