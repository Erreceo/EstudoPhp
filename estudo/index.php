<?php
// A simple web site in Cloud9 that runs through Apache
// Press the 'Run' button on the top to start the web server,
// then click the URL that is emitted to the Output tab of the console

echo 'Hello world from Cloud9!';

?>
<html>
    <head>
        
    </head>
    <body>
        Teste
        
        <table>
                 <?php
                    $par = 0;
                    
                    for ($i = 1; $i <= 5; $i++) {
                         echo "<tr>";
                        for ( $j = 1; $j <= 2; $j++ ) {
                           
                           $par += $j;
                           
                            if ( $j % 2 === 0 ) {
                                echo "<td>";
                                echo $par;
                                echo "</td>";
                            }
                            if ( $j % 2 != 0 ) {
                                echo "<td>";
                                echo $par;
                                echo "</td>";
                            }
                            
                        }
                        echo "</tr>";
                    }
                ?>
          </table>
        
    </body>
</html>