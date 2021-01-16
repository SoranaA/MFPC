using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MFPC_server.Data
{
    public class JobTitleRole
    {
        [Key]
        public int Id { get; set; }

        public int RoleId { get; set; }

        public int JobTitleId { get; set; }

        [ForeignKey("RoleId")]
        public Role Role { get; set; }

        [ForeignKey("JobTitleId")]
        public JobTitle JobTitle { get; set; }
    }
}