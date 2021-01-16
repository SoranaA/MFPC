using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MFPC_server.Data
{
    public class Role
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public virtual ICollection<JobTitleRole> JobTitles { get; set; } = new List<JobTitleRole>();
    }
}