# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket#attributes-reference
# в Attributes Reference описаны все переменные которые возвращаются от aws
# берем наш ресурс который я создал aws_s3_bucket и его бакет cinema_app_s3_bucket и у него есть некоторое количество атрибутов
# которых возвращает aws в том числе и id

output "cinema_app_bucket_name" {
  value = aws_s3_bucket.cinema_app_s3_bucket.id
}

# output "cloudfront_distribution_yudbox_id" {
#   value = aws_cloudfront_distribution.s3_cinema_app_distribution.id
# }