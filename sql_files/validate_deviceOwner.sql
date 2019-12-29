DROP TRIGGER IF EXISTS validate_deviceOwner;

DELIMITER |

CREATE TRIGGER validate_deviceOwner BEFORE INSERT ON device_owner FOR EACH ROW 
BEGIN
      	IF EXISTS (select device_owner.email from device_owner where device_owner.deviceNum = NEW.deviceNum AND device_owner.email = NEW.email) THEN
                SIGNAL sqlstate '45001' set message_text = "Device already registered!"; 
        END IF;
END
|

DELIMITER ;