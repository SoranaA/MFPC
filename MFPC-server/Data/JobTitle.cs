using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MFPC_server.Data
{
    public class JobTitle
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public virtual ICollection<JobTitleRole> Roles { get; set; } = new List<JobTitleRole>();
    }
}
