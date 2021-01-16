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
    public class JobTitlesController : ControllerBase
    {
        private readonly _DbContext _context;

        public JobTitlesController(_DbContext context)
        {
            _context = context;
        }

        // GET: api/JobTitles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobTitle>>> GetJobTitle()
        {
            return await _context.JobTitle.ToListAsync();
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
        public async Task<ActionResult<JobTitle>> PostJobTitle(JobTitle jobTitle)
        {
            _context.JobTitle.Add(jobTitle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobTitle", new { id = jobTitle.Id }, jobTitle);
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