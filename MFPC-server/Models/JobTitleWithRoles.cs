using System.Collections.Generic;

namespace MFPC_server.Models
{
    public class JobTitleWithRoles
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<RoleInfo> Roles { get; set; }

        public JobTitleWithRoles(int id, string name, string description, List<RoleInfo> roles)
        {
            Id = id;
            Name = name;
            Description = description;
            Roles = roles;
        }
    }
}