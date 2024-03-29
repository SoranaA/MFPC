﻿namespace MFPC_server.Models
{
    public class RoleInfo
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public RoleInfo(int id, string name, string description)
        {
            Id = id;
            Name = name;
            Description = description;
        }
    }
}