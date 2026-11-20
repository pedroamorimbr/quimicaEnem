CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(254) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS student_profiles (
    user_id BIGINT UNSIGNED NOT NULL,
    age TINYINT UNSIGNED NULL,
    grade VARCHAR(30) NULL,
    study_goal VARCHAR(80) NULL,
    weekly_study_hours DECIMAL(4,1) NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    CONSTRAINT student_profiles_user_fk
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_sessions (
    session_id VARCHAR(128) NOT NULL,
    payload MEDIUMBLOB NOT NULL,
    expires_at DATETIME NOT NULL,
    PRIMARY KEY (session_id),
    KEY app_sessions_expires_at_idx (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS quiz_attempts (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    attempt_key CHAR(32) NOT NULL,
    score TINYINT UNSIGNED NOT NULL,
    total_questions TINYINT UNSIGNED NOT NULL,
    elapsed_seconds INT UNSIGNED NOT NULL DEFAULT 0,
    completed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY quiz_attempts_user_attempt_unique (user_id, attempt_key),
    KEY quiz_attempts_user_completed_idx (user_id, completed_at),
    CONSTRAINT quiz_attempts_user_fk
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
