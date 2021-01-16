using System.ComponentModel.DataAnnotations;

namespace MFPC_server.Data
{
    public class Organisation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Address { get; set; }
    }
}
