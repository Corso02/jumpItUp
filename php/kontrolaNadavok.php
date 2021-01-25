<?php 
    function kontrolaNadavok($data){
        $data = strtolower($data); //spravim string aby bol lowercase = nemusim pisat rozne varianty slov (jedno random pismeno velkym) + zapis do DB ostane povodny 
        $existujeNadavka = false;
        $nadavky=['kokot', 'pica', 'picovina', 'debil', 'chuj', 'kurva', 'jeb'];
        $pocetNadavok = count($nadavky);
    
        for($i = 0; $i < $pocetNadavok; $i++){
            if(strpos($data, $nadavky[$i])) $existujeNadavka = true;
            else if ($data == $nadavky[$i]) $existujeNadavka = true;
        }
        return $existujeNadavka;
    }
?>