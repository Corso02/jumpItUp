<?php 
    function vypisanieHviezd($pocetHviezd){
        switch ($pocetHviezd){
            case '0': echo "<span class = 'fa fa-star'></span><span class = 'fa fa-star'></span><span class = 'fa fa-star'></span><span class = 'fa fa-star'></span><span class = 'fa fa-star'></span>";
                    break;
            case '1': echo "<span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star'></span><span class = 'fa fa-star'></span><span class = 'fa fa-star'></span><span class = 'fa fa-star'></span>";
                    break;
            case '2': echo "<span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star'></span><span class = 'fa fa-star'></span><span class = 'fa fa-star'></span>";
                    break;
            case '3': echo "<span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star'></span><span class = 'fa fa-star'></span>";
                    break;
            case '4': echo "<span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star'></span>";
                    break;
            case '5': echo "<span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star' style='color:orange'></span><span class = 'fa fa-star' style='color:orange'></span>";
                    break;
            
            }

    }