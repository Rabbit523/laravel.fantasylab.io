<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name, $email, $description, $phone, $company;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->name = $data['data']['name'];
        $this->email = $data['data']['email'];
        $this->description = $data['data']['message'];
        $this->phone = $data['data']['phone'];
        $this->company = $data['data']['company'];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {   
        return $this->view('email.contact-request', compact('name', 'email', 'description', 'phone', 'company'))
        ->from("no-reply@fantasylab.io", "FantasyLab")
        ->subject('A new contact request by '.$this->name);
    }
}
