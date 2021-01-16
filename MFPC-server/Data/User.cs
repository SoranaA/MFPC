﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MFPC_server.Data
{
    public class User
    {
        [Key]
        public  int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        public int? JobTitleId { get; set; }

        [ForeignKey("JobTitleId")]
        public virtual JobTitle JobTitle { get; set; }
    }
}
