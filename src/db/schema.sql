CREATE TABLE clusters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_id INT UNIQUE -- Relaciona com o dono do cluster
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owned_cluster_id INT UNIQUE, -- Relaciona com o cluster que o usuário possui
    cluster_id INT UNIQUE,       -- Relaciona com o cluster que o usuário pertence
    CONSTRAINT fk_owned_cluster
        FOREIGN KEY (owned_cluster_id) 
        REFERENCES clusters(id) 
        ON DELETE SET NULL, 
    CONSTRAINT fk_cluster
        FOREIGN KEY (cluster_id) 
        REFERENCES clusters(id) 
        ON DELETE SET NULL
);

ALTER TABLE clusters
ADD CONSTRAINT fk_owner
FOREIGN KEY (owner_id)
REFERENCES users(id)
ON DELETE SET NULL;
