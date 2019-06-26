$.getJSON("data.json", function(data) {
    data.questions.forEach((element,i) => {if (i==0){
        $(".question-append").append(`
        <div class="column">
            <div class="h2-background">
                <h2>${element["question_name"]}</h2>
            </div>
            <div class="row">
                <label>
                    <input type="radio" name=${element["answers"][0]["name"]} value=${element["answers"][0]["value"]}/>
                    <span class="big-text">${element["answers"][0]["text"]}</span>
                </label>

                <label>
                    <input type="radio" name=${element["answers"][1]["name"]} value=${element["answers"][1]["value"]}/>
                    <span class="big-text">${element["answers"][1]["text"]}</span>
                </label>
                <label>
                    <input type="radio" name=${element["answers"][2]["name"]} value=${element["answers"][2]["value"]}/>
                    <span class="big-text">${element["answers"][2]["text"]}</span>
                </label>
            </div>
            <div class="row">
                <label>
                    <input type="radio" name=${element["answers"][3]["name"]} value=${element["answers"][3]["value"]}/>
                    <span class="big-text">${element["answers"][3]["text"]}</span>
                </label>
                <label>
                    <input type="radio" name=${element["answers"][4]["name"]} value=${element["answers"][4]["value"]}/>
                    <span class="big-text">${element["answers"][4]["text"]}</span>
                </label>
                <label>
                    <input type="radio" name=${element["answers"][5]["name"]} value=${element["answers"][5]["value"]}/>
                    <span class="big-text">${element["answers"][5]["text"]}</span>
                </label>
            </div>
        </div>`);
    }
    else{
        $(".question-append").append(`
        <div class="column">
            <div class="h2-background">
                <h2>${element["question_name"]}</h2>
            </div>
            <div class="row">
                <label>
                    <input type="radio" name=${element["answers"][0]["name"]} value=${element["answers"][0]["value"]}/>
                    <span>
                        <img width=200px height=200px src=${element["answers"][0]["img_url"]}>
                        <p>${element["answers"][0]["text"]}</p>
                    </span>
                </label>
                <label>
                    <input type="radio" name=${element["answers"][1]["name"]} value=${element["answers"][1]["value"]}/>
                    <span>
                        <img width=200px height=200px src=${element["answers"][1]["img_url"]}>
                        <p>${element["answers"][1]["text"]}</p>
                    </span>
                </label>
                <label>
                    <input type="radio" name=${element["answers"][2]["name"]} value=${element["answers"][2]["value"]}/>
                    <span>
                        <img width=200px height=200px src=${element["answers"][2]["img_url"]}>
                        <p>${element["answers"][2]["text"]}</p>
                    </span>
                </label>
            </div>
            <div class="row">
                <label>
                    <input type="radio" name=${element["answers"][3]["name"]} value=${element["answers"][3]["value"]}/>
                    <span>
                        <img width=200px height=200px src=${element["answers"][3]["img_url"]}>
                        <p>${element["answers"][3]["text"]}</p>
                    </span>
                </label>
                <label>
                    <input type="radio" name=${element["answers"][4]["name"]} value=${element["answers"][4]["value"]}/>
                    <span>
                        <img width=200px height=200px src=${element["answers"][4]["img_url"]}>
                        <p>${element["answers"][4]["text"]}</p>
                    </span>
                </label>
                <label>
                    <input type="radio" name=${element["answers"][5]["name"]} value=${element["answers"][5]["value"]}/>
                    <span>
                        <img width=200px height=200px src=${element["answers"][5]["img_url"]}>
                        <p>${element["answers"][5]["text"]}</p>
                    </span>
                </label>
            </div>
        </div>`);
    }
    });
    //Submit Result 
    $('#submit').on('click', function(e) {
        // gather all checked radio-button values
        const numbers = $("input[type='radio']:checked").map(function(i, radio) { 
        return parseInt($(radio).val());
        }).toArray();
        // now you have an array of choices = ["valueofradiobox1", "valueofradiobox2", "valueofradiobox2"]
        // you'll need to do some calculations with this
        // a naive approach would be to just choose the most common option - seems reasonable
        
        // Sum function code from https://medium.com/@chrisburgin95/rewriting-javascript-sum-an-array-dbf838996ed0
        // function for adding two numbers. Easy!
        console.log(numbers);
        if (numbers.length < 5){
            alert("Please answer all of the questions! Answers have been reset");
            location.reload();
        }
        const add = (a, b) =>
            a + b
        // use reduce to sum our array
        const sum = numbers.reduce(add)
        // End of cited code

        console.log(sum);

        if (sum < 6) {
            $("#result").html(`<div class="result-container"><h1 style='color: green;'>${data.outcomes["outcome1"]["text"]}</h1>
            <div><img id="outcome" src=${data.outcomes["outcome1"]["img"]}></div></div>`);
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
            }
            else if (sum < 11){
                $("#result").html(`<div class="result-container"><h1 style='color: green;'>${data.outcomes["outcome2"]["text"]}</h1>
                <div><img id="outcome" src=${data.outcomes["outcome2"]["img"]}></div></div>`);
                $("html, body").animate({ scrollTop: $(document).height() }, "slow");

            }
            else if (sum < 16){
                $("#result").html(`<div class="result-container"><h1 style='color: green;'>${data.outcomes["outcome3"]["text"]}</h1>
                <div><img id="outcome" src=${data.outcomes["outcome3"]["img"]}></div></div>`);
                $("html, body").animate({ scrollTop: $(document).height() }, "slow");

            }
            else if (sum < 21){
                $("#result").html(`<div class="result-container"><h1 style='color: green;'>${data.outcomes["outcome4"]["text"]}</h1>
                <div><img id="outcome" src=${data.outcomes["outcome4"]["img"]}></div></div>`);
                $("html, body").animate({ scrollTop: $(document).height() }, "slow");

            }
            else{
                $("#result").html(`<div class="result-container"><h1 style='color: green;'>${data.outcomes["outcome5"]["text"]}</h1>
                <div><img id="outcome" src=${data.outcomes["outcome5"]["img"]}></div></div>`);
                $("html, body").animate({ scrollTop: $(document).height() }, "slow");
            }

    });

    $(document).ready(function() {
        $("input[type='radio']").change(function() {
            $("input[type='radio'][name='"+this.name+"']:checked+span").css({"box-shadow": "0 5px 15px 2px rgba(0, 0, 0, 0.7)", "border": "5px solid green", "filter":"none", "color":"black"});
            $("input[type='radio'][name='"+this.name+"']:not(:checked)+span").css({"color": "grey", "filter": "brightness(65%)", "box-shadow":"none", "border":"none"});
        });
      });

});




    








