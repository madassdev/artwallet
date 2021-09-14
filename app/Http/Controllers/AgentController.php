<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Notifications\AgentStatusNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class AgentController extends Controller
{
    public function index()
    {
        $per_page = request()->per_page ?? 10;
        $agents = Agent::with('user')->paginate($per_page);
        return response()->json([
            "success" => true,
            "data" => [
                "agents" => $agents,
                "total" => 300
            ]
        ]);
    }

    public function agentAction(Request $request, Agent $agent)
    {
        $request->validate([
            'status' => 'required|in:approved,disapproved,success,cancelled'
        ]);

        $agent->status = $request->status;
        if($agent->has_paid)
        {
            $agent->status = 'success';
        }
        $agent->save();
        if ($agent->status == 'approved') {
            Notification::send($agent->user, new AgentStatusNotification($agent->user, $request->status));
        }
        return response()->json([
            "success" => true,
            "message" => "Agent " . $request->status . " successfully!"
        ]);
    }
}
