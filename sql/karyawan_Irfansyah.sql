CREATE VIEW karyawan_Irfansyah AS
SELECT 
    ROW_NUMBER() OVER () AS no,
    nip,
    nama,
    alamat,
    CASE gend
        WHEN 'L' THEN 'Laki-Laki'
        WHEN 'P' THEN 'Perempuan'
        ELSE 'Tidak Diketahui'
    END AS gender,
    DATE_FORMAT(tgl_lahir, '%d %M %Y') AS tanggal_lahir
FROM karyawan;
