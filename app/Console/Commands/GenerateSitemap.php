<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.';

    public $portfolio_sub_domains = [];

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $sitemap = SitemapGenerator::create(config('app.url'))
        ->hasCrawled(function (Url $url) {
            if (strpos($url->segment(1), 'images') !== false || strpos($url->segment(1), 'assets') !== false) {
                return;
            }
            if (strpos($url->segment(1), 'web-development') !== false || strpos($url->segment(1), 'illustration') !== false) {
                return;
            }
            if (!empty($url->segment(2))) {
                array_push($this->portfolio_sub_domains, $url->segment(2));
            }
            return $url;
        })
        ->getSitemap()
        ->add(Url::create('/data-processor'))
        ->add(Url::create('/features'))
        ->add(Url::create('/managed-hosting'))
        ->add(Url::create('/illustration'))
        ->add(Url::create('/web-development'))
        ->add(Url::create('/no'))
        ->add(Url::create('/no/logginn'))
        ->add(Url::create('/no/start-prosjekt'))
        ->add(Url::create('/no/portefolje'))
        ->add(Url::create('/no/webutvikling'))
        ->add(Url::create('/no/mobilutvikling'))
        ->add(Url::create('/no/ui-ux-design'))
        ->add(Url::create('/no/merkevarebygging'))
        ->add(Url::create('/no/illustrasjon'))
        ->add(Url::create('/no/markedsføringsmateriell'))
        ->add(Url::create('/no/administrert-hosting'))
        ->add(Url::create('/no/funksjoner'))
        ->add(Url::create('/no/om-oss'))
        ->add(Url::create('/no/blogg'))
        ->add(Url::create('/no/kontakt'))
        ->add(Url::create('/no/personvern'))
        ->add(Url::create('/no/databehandler'))
        ->add(Url::create('/no/vilkar'))
        ->add(Url::create('/no/konfidensialitet'));
        
        foreach ($this->portfolio_sub_domains as $domain) {
            $sitemap->add(Url::create('/no/portefolje/'.$domain));
        }
        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
