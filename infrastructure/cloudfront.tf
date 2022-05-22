###################################
# CLOUDFRONT RESOURSES
###################################

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution#example-usage
# добавляем новый ресурс



resource "aws_cloudfront_distribution" "s3_cinema_app_distribution" {
  origin {
    #   https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution#custom-origin-config-arguments
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]

    }

    # первые два параметра берутся из s3.tf resource "aws_s3_bucket" "cinema_app_s3_bucket" {}
    # последние стандартно bucket_regional_domain_name
    domain_name = aws_s3_bucket.cinema_app_s3_bucket.bucket_regional_domain_name
    origin_id   = local.s3_origin_id
  }

  retain_on_delete    = true             # При загрузки новой distribution отключает старый distribution вместо его удаления при уничтожении ресурса через Terraform. Если это установлено, distribution необходимо удалить вручную после этого.
  price_class         = "PriceClass_200" # На сколько регионов планеты будет действовать distribution. 1. PriceClass_100 Только Америка 2. PriceClass_200 Америка + Европа 3. PriceClass_All Весь мир
  enabled             = true             # разрешено ли всем пользователям загружать страницу с этого distribution (URL)
  is_ipv6_enabled     = true
  default_root_object = "index.html" # по данному URL первым будет возвращаться файл index.html


  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution#cache-behavior-arguments
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution#forwarded-values-arguments
    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https" # Используйте этот элемент, чтобы указать протокол, который пользователи могут использовать для доступа к файлам в источнике, указанном TargetOriginId,
    min_ttl                = 0                   # ttl - time to leave
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = local.common_tag // добавит в переменную tags данные из main.tf -> locals

  viewer_certificate {
    cloudfront_default_certificate = true # потому что у нас нет доменного имени используем стандартный сертификат aws
  }
}