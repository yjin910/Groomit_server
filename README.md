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
