using MFPC_server.Data;
using MFPC_server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFPC_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobTitlesController : ControllerBase
    {
        private readonly _DbContext _context;

        public JobTitlesController(_DbContext context)
        {
            _context = context;
        }

        // GET: api/JobTitles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobTitleWithRoles>>> GetJobTitle()
        {
            var jobTitles =
                await _context.JobTitle
                .Include(j => j.Roles)
                .ToListAsync();

            var jobTitlesWithRoles = new List<JobTitleWithRoles>();

            foreach (var jobTitle in jobTitles)
            {
                var roles = new List<RoleInfo>();

                foreach (var jobTitleRole in jobTitle.Roles)
                {
                    var role = _context.Role.Where(r => r.Id == jobTitleRole.RoleId).FirstOrDefault();
                    roles.Add(new RoleInfo(role.Id, role.Name, role.Description));
                }

                jobTitlesWithRoles.Add(new JobTitleWithRoles(
                    jobTitle.Id,
                    jobTitle.Name,
                    jobTitle.Description,
                    roles
                    ));
            }

            return jobTitlesWithRoles;
        }

        // GET: api/JobTitles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobTitle>> GetJobTitle(int id)
        {
            var jobTitle = await _context.JobTitle.FindAsync(id);

            if (jobTitle == null)
            {
                return NotFound();
            }

            return jobTitle;
        }

        // PUT: api/JobTitles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobTitle(int id, JobTitle jobTitle)
        {
            if (id != jobTitle.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobTitle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobTitleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/JobTitles
        [HttpPost]
        public async Task<IActionResult> PostJobTitle(AddJobTitleModel jobTitleToAdd)
        {
            JobTitle jobTitle = new JobTitle()
            {
                Name = jobTitleToAdd.Name,
                Description = jobTitleToAdd.Description
            };

            _context.JobTitle.Add(jobTitle);
            await _context.SaveChangesAsync();

            foreach (var roleId in jobTitleToAdd.Roles)
            {
                var jobTitleRole = new JobTitleRole()
                {
                    RoleId = roleId,
                    JobTitleId = jobTitle.Id
                };

                _context.JobTitleRole.Add(jobTitleRole);
            }

            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetJobTitle", new { id = jobTitle.Id }, jobTitle);
            return NoContent();
        }

        // DELETE: api/JobTitles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<JobTitle>> DeleteJobTitle(int id)
        {
            var jobTitle = await _context.JobTitle.FindAsync(id);
            if (jobTitle == null)
            {
                return NotFound();
            }

            _context.JobTitle.Remove(jobTitle);
            await _context.SaveChangesAsync();

            return jobTitle;
        }

        private bool JobTitleExists(int id)
        {
            return _context.JobTitle.Any(e => e.Id == id);
        }
    }
}