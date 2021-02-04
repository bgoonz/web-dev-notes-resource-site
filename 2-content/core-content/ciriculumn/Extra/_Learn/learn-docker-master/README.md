============




## Why?


## What?





















```sh
```




```sh
```




```sh
CPUs: 1
```





```sh
```
```sh
```


```sh
```


```sh
```


```sh
```



```sh
```




```sh
```




```sh
```






```sh
```

```sh
```



```


ENV APP_HOME /app
WORKDIR $APP_HOME


```


```
  app:
      - "4000:4000"
      - .:/app
      - db
  db:
        - "5432:5432"
```



```














