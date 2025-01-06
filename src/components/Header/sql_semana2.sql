DECLARE
    -- Variable BIND para ingresar el periodo del proceso
    v_periodo VARCHAR2(10) := '&periodo';  -- Usamos la variable BIND para ingresar el periodo
    
    -- Variables escalares usando %TYPE para mantener la consistencia con los tipos de las columnas
    v_renta CLIENTE.renta%TYPE; 
    v_edad CLIENTE.edad%TYPE;
    v_puntaje NUMBER := 0;  -- Variable escalar para puntaje
    v_correo VARCHAR2(100);  -- Variable escalar para el correo
    v_total_clientes NUMBER := 0;
    v_clientes_procesados NUMBER := 0;

    -- Cursor para recorrer todos los clientes
    CURSOR clientes_cursor IS
        SELECT id_cli, numrun_cli, appaterno_cli, pnombre_cli, fecha_nac_cli, renta, id_comuna, id_tipo_cli
        FROM CLIENTE;

    -- Variables adicionales
    v_fecha_nac DATE;
    v_comuna_nombre COMUNA.nombre_comuna%TYPE; -- Usar %TYPE para la comuna
BEGIN
    -- Truncar la tabla DETALLE_DE_CLIENTES antes de comenzar el proceso
    EXECUTE IMMEDIATE 'TRUNCATE TABLE DETALLE_DE_CLIENTES';

    -- Recorrer todos los clientes
    FOR cliente IN clientes_cursor LOOP
        -- Asignar los valores de cada cliente al bloque de variables
        v_renta := cliente.renta;
        v_edad := (MONTHS_BETWEEN(SYSDATE, cliente.fecha_nac_cli) / 12);
        v_comuna_nombre := cliente.id_comuna;  -- Comuna (a través del id_comuna)
        
        -- Inicializar el puntaje
        v_puntaje := 0;

        -- Regla (d): Si renta > 700,000 y no vive en las comunas especificadas
        IF v_renta > 700000 AND v_comuna_nombre NOT IN (SELECT id_comuna FROM COMUNA WHERE nombre_comuna IN ('La Reina', 'Las Condes', 'Vitacura')) THEN
            v_puntaje := ROUND(v_renta * 0.03);
        END IF;

        -- Regla (e): Si no se cumple la regla anterior, puntaje por edad
        IF v_puntaje = 0 AND (cliente.id_tipo_cli = 'I' OR cliente.id_tipo_cli = 'V') THEN
            v_puntaje := 30 * v_edad;
        END IF;

        -- Regla (f): Si puntaje es 0, obtener porcentaje desde TRAMO_EDAD
        IF v_puntaje = 0 THEN
            SELECT porcentaje INTO v_puntaje
            FROM TRAMO_EDAD
            WHERE TRAMO_INF <= v_edad AND TRAMO_SUP >= v_edad
            AND ANNO_VIG = TO_NUMBER(SUBSTR(v_periodo, 3, 4));
            v_puntaje := ROUND(v_renta * v_puntaje / 100);
        END IF;

        -- Generar el correo electrónico
        v_correo := LOWER(cliente.appaterno_cli) || v_edad || '*' || SUBSTR(cliente.pnombre_cli, 1, 1) || 
                    TO_CHAR(cliente.fecha_nac_cli, 'DD') || v_periodo || '@LogiCarg.cl';

        -- Insertar los resultados en la tabla DETALLE_DE_CLIENTES
        INSERT INTO DETALLE_DE_CLIENTES (IDC, RUT, CLIENTE, EDAD, PUNTAJE, CORREO_CORP, PERIODO)
        VALUES (cliente.id_cli, cliente.numrun_cli, cliente.pnombre_cli || ' ' || cliente.appaterno_cli, 
                v_edad, v_puntaje, v_correo, v_periodo);

        -- Contador de clientes procesados
        v_clientes_procesados := v_clientes_procesados + 1;
    END LOOP;

    -- Verificar si todos los clientes fueron procesados correctamente
    SELECT COUNT(*) INTO v_total_clientes FROM CLIENTE;
    IF v_total_clientes = v_clientes_procesados THEN
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Proceso exitoso: Se procesaron ' || v_total_clientes || ' clientes.');
    ELSE
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error: El proceso no recorrió todos los clientes.');
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error en el proceso: ' || SQLERRM);
END;
/
