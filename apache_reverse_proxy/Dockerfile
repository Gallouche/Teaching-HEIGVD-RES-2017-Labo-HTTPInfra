FROM php:5.6-apache

COPY apache2-foreground /usr/local/bin/
COPY templates /var/apache2/templates
COPY conf/ /etc/apache2

#RUN apt-get update && apt-get install -y vim
RUN chmod 755 /usr/local/bin/apache2-foreground
RUN a2enmod proxy proxy_http
RUN touch /etc/apache2/sites-available/001-reverse-proxy.conf
RUN a2ensite 000-* 001-*
