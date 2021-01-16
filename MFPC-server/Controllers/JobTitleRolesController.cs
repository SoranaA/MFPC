using MFPC_server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFPC_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobTitleRolesController : ControllerBase
    {
        private readonly _DbContext _context;

        public JobTitleRolesController(_DbContext context)
        {
            _context = context;
        }

        // GET: api/JobTitleRoles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobTitleRole>>> GetJobTitleRole()
        {
            return await _context.JobTitleRole.ToListAsync();
        }

        // GET: api/JobTitleRoles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobTitleRole>> GetJobTitleRole(int id)
        {
            var jobTitleRole = await _context.JobTitleRole.FindAsync(id);

            if (jobTitleRole == null)
            {
                return NotFound();
            }

            return jobTitleRole;
        }

        // PUT: api/JobTitleRoles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobTitleRole(int id, JobTitleRole jobTitleRole)
        {
            if (id != jobTitleRole.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobTitleRole).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobTitleRoleExists(id))
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

        // POST: api/JobTitleRoles
        [HttpPost]
        public async Task<ActionResult<JobTitleRole>> PostJobTitleRole(JobTitleRole jobTitleRole)
        {
            _context.JobTitleRole.Add(jobTitleRole);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobTitleRole", new { id = jobTitleRole.Id }, jobTitleRole);
        }

        // DELETE: api/JobTitleRoles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<JobTitleRole>> DeleteJobTitleRole(int id)
        {
            var jobTitleRole = await _context.JobTitleRole.FindAsync(id);
            if (jobTitleRole == null)
            {
                return NotFound();
            }

            _context.JobTitleRole.Remove(jobTitleRole);
            await _context.SaveChangesAsync();

            return jobTitleRole;
        }

        private bool JobTitleRoleExists(int id)
        {
            return _context.JobTitleRole.Any(e => e.Id == id);
        }
    }
}