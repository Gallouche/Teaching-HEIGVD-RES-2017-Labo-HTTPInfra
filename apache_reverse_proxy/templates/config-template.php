<?php
    $dynamic_app = getenv('DYNAMIC_APP');
    $static_app = getenv('STATIC_APP');
?>
<VirtualHost *:80>
    ServerName demo.res.ch

    ProxyPass '/api/festival/' 'http://<?php print "$dynamic_app"?>/'
    ProxyPassReverse '/api/festival/' 'http://<?php print "$dynamic_app"?>/'

    ProxyPass '/' 'http://<?php print "$static_app"?>/'
    ProxyPassReverse / 'http://<?php print "$static_app"?>/'
</VirtualHost>