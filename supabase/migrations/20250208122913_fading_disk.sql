/*
  # Financial Users Database Schema

  1. New Tables
    - `users`
      - Basic User Details
        - `id` (uuid, primary key)
        - `name` (text)
        - `email` (text, unique)
        - `phone_number` (text, unique, encrypted)
        - `age` (integer)
        - `city` (text)
        - `country` (text)
      - Financial Details
        - `annual_income` (bigint)
        - `monthly_income` (bigint, computed)
        - `fixed_expenses` (bigint)
        - `disposable_income` (bigint, computed)
        - `investment_preference` (enum)
        - `investment_horizon` (enum)
        - `current_portfolio` (jsonb)
      - AI-Driven Insights
        - `financial_health_score` (decimal)
        - `risk_tolerance_score` (decimal)
        - `investment_goals` (jsonb)
        - `preferred_asset_classes` (jsonb)
        - `last_interaction_date` (timestamptz)
      - Security & Timestamps
        - `password_hash` (text)
        - `authentication_method` (enum)
        - `created_at` (timestamptz)
        - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on users table
    - Add policies for authenticated users
    - Encrypt sensitive data
    - Add validation checks

  3. Features
    - Automatic timestamp management
    - Computed columns for derived values
    - Data validation using check constraints
    - Secure password storage
*/

-- Create custom types for enums
CREATE TYPE investment_preference_type AS ENUM ('High-Risk', 'Medium-Risk', 'Low-Risk');
CREATE TYPE investment_horizon_type AS ENUM ('Short-Term', 'Medium-Term', 'Long-Term');
CREATE TYPE auth_method_type AS ENUM ('JWT', 'OAuth', 'Biometric');

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  -- Basic User Details
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone_number text UNIQUE NOT NULL,
  age integer NOT NULL CHECK (age >= 18),
  city text NOT NULL,
  country text NOT NULL DEFAULT 'India',

  -- Financial Details
  annual_income bigint NOT NULL CHECK (annual_income >= 0),
  monthly_income bigint GENERATED ALWAYS AS (annual_income / 12) STORED,
  fixed_expenses bigint NOT NULL CHECK (fixed_expenses >= 0),
  disposable_income bigint GENERATED ALWAYS AS (annual_income / 12 - fixed_expenses) STORED,
  investment_preference investment_preference_type NOT NULL,
  investment_horizon investment_horizon_type NOT NULL,
  current_portfolio jsonb DEFAULT '[]'::jsonb,

  -- AI-Driven Insights
  financial_health_score decimal(5,2) CHECK (financial_health_score BETWEEN 0 AND 100),
  risk_tolerance_score decimal(5,2) CHECK (risk_tolerance_score BETWEEN 0 AND 100),
  investment_goals jsonb DEFAULT '[]'::jsonb,
  preferred_asset_classes jsonb DEFAULT '[]'::jsonb,
  last_interaction_date timestamptz DEFAULT now(),

  -- Security & Access Control
  password_hash text NOT NULL,
  authentication_method auth_method_type NOT NULL DEFAULT 'JWT',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create index for frequently accessed columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone_number ON users(phone_number);

-- Create function to encrypt phone numbers
CREATE OR REPLACE FUNCTION encrypt_phone_number()
RETURNS TRIGGER AS $$
BEGIN
  -- Use pgcrypto to encrypt phone number
  NEW.phone_number = encode(encrypt(
    NEW.phone_number::bytea,
    current_setting('app.settings.jwt_secret')::bytea,
    'aes'
  ), 'hex');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for phone number encryption
CREATE TRIGGER encrypt_phone_number_trigger
  BEFORE INSERT OR UPDATE OF phone_number ON users
  FOR EACH ROW
  EXECUTE FUNCTION encrypt_phone_number();

-- Add comment for table documentation
COMMENT ON TABLE users IS 'Stores user financial profiles with security measures and AI-driven insights';