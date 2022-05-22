###################################
# S3 RESOURSES
###################################

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket

# acl описывает кто может обращаться к этому бакету Valid values are private, public-read, public-read-write, aws-exec-read, authenticated-read, and log-delivery-write
resource "aws_s3_bucket" "cinema_app_s3_bucket" {
  bucket        = local.prefix
  acl           = "public-read"
  force_destroy = true

  # https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html#example-bucket-policies-use-case-2
  # добавляет в бакет в раздел Permissions -> Policy конфигурацию
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::${local.prefix}/*"
            ]
        }
    ]
}
  EOF

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  versioning {
    enabled = true
  }
  tags = local.common_tag
}


