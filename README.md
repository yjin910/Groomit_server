# Groomit_server

## SQL

### PROCEDURES

#### 1. insertGeiger

insertGeiger(deviceNum (VARCHAR(20)) , type (CHAR(1)) , value (FLOAT) , datetime (DATETIME) )

가이거 값을 추가할 때 사용. measurement 테이블에 데이터를 추가하면서, 동시에 recent_value에 해당 기기에 대한 데이터가 있는지 확인하고, 새로 추가하거나 값을 업데이트한다.

#### 2. insertHumidity

insertHumidity(deviceNum (VARCHAR(20)) , type (CHAR(1)) , value (FLOAT) , datetime (DATETIME) )

습도 값을 추가할 때 사용. measurement 테이블에 데이터를 추가하면서, 동시에 recent_value에 해당 기기에 대한 데이터가 있는지 확인하고, 새로 추가하거나 값을 업데이트한다.

#### 3. insertTemperature

insertTemperature(deviceNum (VARCHAR(20)) , type (CHAR(1)) , value (FLOAT) , datetime (DATETIME) )

온도 값을 추가할 때 사용. measurement 테이블에 데이터를 추가하면서, 동시에 recent_value에 해당 기기에 대한 데이터가 있는지 확인하고, 새로 추가하거나 값을 업데이트한다.

### TRIGGERS

#### 1. validate_deviceNum

meauserment 테이블로 데이터를 추가할 때, 등록 되지 않은 데이터의 경우에는 insert를 허용하지 않는다. 이를 통해서 사용자가 올바르지 않은 값을 데이터베이스에 추가하려는 시도를 막을 수 있다.

#### 2. validate_deviceOwner

device_owner 테이블 안에 중복 데이터가 생기지 않도록 확인하는 기능을 수행한다. 만약, 사용자가 이미 등록된 기기를 다시 등록하려고 한다면, "Device already registered!" 라는 에러 메세지를 출력한다.

## TODO

1. sharing private files (mysql info & firebase key file)
파이어베이스 키 파일 등을 private 디렉토리에 넣고 gitignore에 추가함. 이 파일들은 github에 올리지 않을 것이기 때문에, 다른 개발자들 역시 사본을 가지고 있거나, 혹은 공용 저장소 등에 올려두고 필요할 때 다운 받는 식으로 해야 할 듯 싶다.

2. firebase subscribe
현재는 무료 계정으로 사용을 하고 있기 때문에 허용된 리소스 사용 가능량이 제한되어 있다. 따라서, 실제로 앱을 publish하기 전에는 파이어베이스 서비스 구매를 해야 할 수도 있을 것이다.
아니면, 테크노니아 계정이나 다른 공식 계정으로 서비스를 사용하는 것이 옳을 것 같다.

3. preferred_service 테이블

각 사용자가 가장 선호하는 서비스를 저장할 테이블인 preferred_service 테이블을 만들었다. 서버가 이 테이블에 데이터를 저장하고 사용하게 만들자!

4. dbConnection functions

dbConnection.js 파일의 새로운 함수들을 서버에 적용하기!
