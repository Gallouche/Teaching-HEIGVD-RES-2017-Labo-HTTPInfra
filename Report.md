# Teaching-HEIGVD-RES-2017-Labo-HTTPInfra

## Introduction
This is the report of the last RES lab on a complete web archtecture using http apache server, express server and ajax request.

This lab take place in 5 steps, and some optionnal features.
## Step 1: Static HTTP server with apache httpd

### Description
For this step, it was asked to start a static server on a Docker container.
We have used a free HTML5 framwork from the site [HTML5 UP](https://html5up.net/ "html5up's Homepage"), precisely [Strata](https://html5up.net/strata), and we've modified it to stick with our implementation.

The Dockerfile created for this step is based on the official docker apache image `httpd:2.4`. We use the default configuration and we copy our tempalte in the server at `/usr/local/apache2/htdocs/`.

### Test instructions
Execute the following steps to see the result of this iteration:

* At the root, execute the following commands:
```
docker build -t http/static_server apache_static_server/
docker run -d -p 8080:80 http/static_server
```

* After this, you can acces to the server on your browser at `localhost:8080`.

## Step 2: Dynamic HTTP server with express.js

### Description
In this step, it was asked to start a server in a Docker container but this time he should be dynamic and send a JSON on a GET http request.

The Dockerfile created for this step is based on Node.js and his official docker image `node:alpine`. This dynamic server is write un JavaScript with the `express` package. The following command of the Dockerfile execute the `npm install` command to get all the used modules et then copy the important files in the server, expose the port 3000 and start.

The point of this server is quit simple, he provide a JSON with 3 attributes :
* A random sentence generated with the npm package [`Sentencer`](http://kylestetz.github.io/Sentencer/).
* A random "good luck" number generated with the npm package [`Chance`](http://chancejs.com/).
* A random hashtag generated with [`Chance`](http://chancejs.com/) aswell.

### Test instructions
Execute the following steps to see the result of this iteration:

* At the root, execute the following commands:
```
docker build -t http/dynamic_server express_dynamic_server/
docker run -d -p 3000:3000 http/dynamic_server
```

* After this, you can acces to the server on your browser at `localhost:3000`.

## Step 3: Reverse proxy with apache (static configuration

### Description
In this step, it was ased to run a reverse proxy server based on apache in a Docker container.

The Dockerfile created for this step is based on the official php docker image `php:5.6-apache`. This is different from the first step because we wanted to try different images to see different way to do an apache server.

As usual, we copy all the usfull files in the container, like the configuration files descripted above.

We've create 2 configuration files in `/etc/apache2/sites-available/`:
* `000-default.conf` for the default configuration
* `001-reverse-proxy.conf` for our custom configuration

In the `001-reverse-proxy.conf` we tell to the server to redirect the requests:
* For `/` to the static server at the static IP of his Docker container on the port 80.
* For `/api/fun/` to the dynamic server at the static IP of his Docker container on the port 3000.

Later in the Dockerfile, we tell to the server to enable his reverse proxy mod with the comand `RUN a2enmod proxy proxy_http`, and then to take the both configuration files with `RUN a2ensite 000-* 001-*`.

### Problemes and improvement
The type of configuration is not easy to handle, you need to start the both static and dynamic server before the reverse proxy and find there Ip addresses to copy them in the configuration file. This not really what we want and we will improve it (not at the optimal point but not bad) in the step 5.

We've decide to not keep this configuration in our final report because of the following improvement and the difficulty (for nothing) to deploy a test. But we remain available to any questions you will have.

## Step 4: AJAX requests with JQuery

### Description
In this step, the objective is to make the static server a little bit more dynamic by making AJAX requests on the dynamic server.

We've created a new JavaScript script that will be load by the html file at a connection on the `/`. This script execute a GET request with a JSON option on `/api/fun/` and then parse the payload to insert it in the html with JQuery for exemple the sentence with :  `$("div.sentence").append(fun.sentence)` that will append the fun.sentence string to the string located at the `<div class="sentence">` element.

### Test instructions
Execute the following steps to see the result of this iteration:

* At the root, execute the following commands:

```
#Build & start the dynamic server
docker build -t http/dynamic_server express_dynamic_server/
docker run -d --name dynamic http/dynamic_server

#Build & start the static server
docker build -t http/static_server apache_static_server/
docker run -d --name static http/static_server
```

* Get the IpAdress of the containers
  * x = docker inspect static | grep -i ipadd
  * y = docker inspect dynamic | grep -i ipadd

```
#Build the reverse proxy server
docker build -t http/reverse_proxy apache_reverse_proxy
#As said before, this is already the semi-dynamic configuration
docker run -e STATIC_APP=172.17.0.x:80 -e DYNAMIC_APP=172.17.0.y:3000 -p 8080:80 http/reverse
```

* You need to modify your hosts file, so your browser can set the right header:
  * Open the hosts file with your favorite editor.
    * On Windows: C:\Windows\System32\Drivers\etc\hosts
    * On MacOs & Linux: /etc/hosts
  * Add the line `127.0.0.1 demo.res.ch`.
  * Save & quit.

* Now you can acces `demo.res.ch:8080` and you can see the text on the left changing each 5 seconds.


## Step 5: Dynamic reverse proxy

## Additional steps to get extra points on top of the "base" grade

### Load balancing: multiple server nodes (0.5pt)

### Load balancing: round-robin vs sticky sessions (0.5 pt)

### Dynamic cluster management (0.5 pt)

### Management UI (0.5 pt)