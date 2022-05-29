# cli command   https://www.terraform.io/cli/commands
# terraform init -reconfigure
# terraform init -migrate-state
# terraform fmt
# terraform validate
# terraform plan
# terraform apply --auto-approve
# terraform destroy



# Terraform использует плагины, называемые «провайдерами», для взаимодействия с 
# облачными провайдерами, провайдерами SaaS и другими API.
# https://www.terraform.io/language/providers/configuration

provider "aws" {
  region = "eu-central-1"
}



# https://www.terraform.io/language/settings/backends/s3
# backend определяет где terraform снимки(данные) будут хранится. В данном случае на s3 bucket
# cinema-tf-state-bucket имя с AWS сервиса созданного через сайт aws
# key - Путь к файлу состояния внутри корзины S3. При использовании рабочей области не по умолчанию путь к состоянию будет /workspace_key_prefix/workspace_name/key
# encrypt шифрование файла состояния (app-cinema.tfstate) на стороне s3 bucket

terraform {
  backend "s3" {
    bucket  = "cinema-tf-state-bucket"
    key     = "app-cinema.tfstate"
    region  = "eu-central-1"
    encrypt = true
  }
}

# https://www.terraform.io/language/values/locals
# Input variables похожи на аргументы функции. terraform.workspace (develop, staging, master)
# Output variables значения аналогичны возвращаемым значениям функции.
# Local variables подобны временным локальным переменным функции.
#  common_tag будут доступны любым ресурсам
# s3_origin_id используем как "default-origin" т.к. у нас нет своего доменного имени

locals {
  prefix       = "${var.prefix}-${terraform.workspace}"
  s3_origin_id = "default-origin"
  common_tag = {
    Environment = terraform.workspace
    Project     = var.project
    ManagedBy   = "Terraform"
    Owner       = "Yudbox"
  }
}

# -----for Linux
# export AWS_ACCESS_KEY_ID=""
# export AWS_SECRET_ACCESS_KEY=""
# -----for windows
# $env:AWS_ACCESS_KEY_ID=""
# $env:AWS_SECRET_ACCESS_KEY=""


