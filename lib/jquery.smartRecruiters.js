// Generated by CoffeeScript 1.6.3
(function() {
  (function($) {
    return $.fn.smartRecruiters = function(options) {
      var defaults,
        _this = this;
      defaults = {
        pageUrl: window.location.href,
        departmentHtmlElement: 'h4'
      };
      options = $.extend({}, defaults, options);
      return $.ajax({
        url: "http://www.smartrecruiters.com/cgi-bin/WebObjects/share.woa/wa/careersite",
        type: "GET",
        dataType: "xml",
        data: {
          wpp_company: options.companyName,
          installed_url: options.pageUrl
        },
        contentType: "application/jsonp; charset=utf-8"
      }).done(function(data) {
        var department, job, jobs, jobsByDepartment, output, result, _i, _j, _len, _len1, _name, _ref;
        result = $.xml2json(data);
        jobsByDepartment = {};
        _ref = result.jobs.job;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          job = _ref[_i];
          if (job.department !== "") {
            jobsByDepartment[_name = job.department] || (jobsByDepartment[_name] = []);
            jobsByDepartment[job.department].push(job);
          }
        }
        output = "";
        for (department in jobsByDepartment) {
          jobs = jobsByDepartment[department];
          output += $(document.createElement(options.departmentHtmlElement)).text(department)[0].outerHTML;
          output += "<ul>";
          for (_j = 0, _len1 = jobs.length; _j < _len1; _j++) {
            job = jobs[_j];
            output += "<li><a href='" + job.detail_url + "' target='_blank'>" + job.title + "</a></li>";
          }
          output += "</ul>";
        }
        return $(_this).append(output);
      });
    };
  })(jQuery);

}).call(this);