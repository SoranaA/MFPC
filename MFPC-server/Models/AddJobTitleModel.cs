using System.Collections.Generic;

namespace MFPC_server.Models
{
    public class AddJobTitleModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<int> Roles { get; set; }
    }
}