DELIMITER $$

CREATE PROCEDURE sp_add_kary_Irfansyah(
    IN p_nip VARCHAR(50),
    IN p_nama VARCHAR(100),
    IN p_alamat VARCHAR(200),
    IN p_gend ENUM('L', 'P'),
    IN p_tgl_lahir DATE
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        GET DIAGNOSTICS CONDITION 1 error_message = MESSAGE_TEXT;

        INSERT INTO log_trx_api (user_id, api, request, response, insert_at) 
        VALUES (p_nip, "sp_add_kary_Irfansyah", 
                JSON_OBJECT('nip', p_nip, 'nama', p_nama, 'alamat', p_alamat, 'gender', p_gend, 'tgl_lahir', p_tgl_lahir), 
                error_message, NOW());

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = error_message;
    END;
    
    START TRANSACTION;

    INSERT INTO karyawan (nip, nama, alamat, gend, tgl_lahir, id)
    VALUES (p_nip, p_nama, p_alamat, p_gend, p_tgl_lahir, 0);

    INSERT INTO log_trx_api (user_id, api, request, response, insert_at) 
    VALUES (p_nip, "sp_add_kary_Irfansyah", JSON_OBJECT('nip', p_nip, 'nama', p_nama, 'alamat', p_alamat, 'gender', p_gend, 'tgl_lahir', p_tgl_lahir), "Berhasil add karyawan", NOW());

    COMMIT;
END$$

DELIMITER ;
