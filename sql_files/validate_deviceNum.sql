DROP TRIGGER IF EXISTS validate_deviceNum;

DELIMITER |

CREATE TRIGGER validate_deviceNum BEFORE INSERT ON measurement FOR EACH ROW 
BEGIN 
      	IF NOT EXISTS (select device_owner.email from device_owner where device_owner.deviceNum = NEW.deviceNum) THEN 
                SIGNAL sqlstate '45001' set message_text = "Not Registered Device!"; 
        END IF; 
END
|

DELIMITER ;